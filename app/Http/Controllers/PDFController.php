<?php

namespace App\Http\Controllers;

use Illuminate\Http\Exception\HttpResponseException;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Http\Response as IlluminateResponse;


use Illuminate\Support\Facades\File;
use DB;
use PDF;
use View;
use PHPMailer;

class PDFController extends Controller
{

    public function __construct(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        date_default_timezone_set("Africa/Lagos");
    }

    public function get_lab_test_pdf(Request $request)
    {
        $arr = array();
        $id = $request->input('lab_test_id');
        $id = str_replace('L', '', $id);

        $db = DB::table('patient_lab_test_values')
            ->select('patient_lab_test_values.id','template_values','template','signoff')
            ->leftJoin('templates','templates.id','=','patient_lab_test_values.template_id')
            ->where('lab_test', $id)->first();


       $template_values = json_decode($db->template_values);
        $template = json_decode($db->template);
        foreach ($template->fields as $temp){
            foreach ($template_values as $k => $v){
                if($temp->name == $k){
                    array_push($arr, ['value'=> $v,'field' =>$temp,]);
                }
            }
        }
        $logo_image = url('/') . '/uploaded_images/';


        //    print_r($arr);
        //    print_r($template_values);
        //    print_r($template);
        //    print_r($template);
        //    echo $template->fields[0]->displayName;


        // All The Patient info is here just uncomment it when required


       $patient = DB::table('patient_lab_test_values')
             ->select(DB::raw('patients.id,CONCAT(patients.first_name," ",patients.last_name) AS patient_name,CONCAT("' . $logo_image . '",patients.patient_image) as patient_image,patients.age,patients.date_of_birth,maritial_status.name as marital_status,(CASE WHEN (sex = 1) THEN "Male" ELSE "Female" END) as gender'))
             ->leftJoin('lab_orders', 'lab_orders.id', '=', 'patient_lab_test_values.lab_order_id')
             ->leftJoin('patients', 'patients.id', '=', 'lab_orders.patient_id')
             ->leftJoin('maritial_status', 'patients.marital_status', '=', 'maritial_status.id')
             ->where('lab_test', $id)->first();

      // array_push($arr,['patient'=>$patient]);

        $data = ['data'=>$arr,'patient'=>$patient];

        $view =  app()->make('view')->make('report_pdf', $data)->render();
//    return $view;
//    return $view;

        $pdf = PDF::loadHTML($view);
        // return $pdf->stream($file_archive);

        $path = base_path().'/public/patient_archive/report.pdf';

        $pdf->save($path);

        $file_archive = url('/').'/patient_archive/report.pdf';

        echo json_encode(array(
            'status' => true,
            'data' => $file_archive,
            'is_signup' => $db->signoff,
            'lab_test_id'=>$db->id

        ), JSON_UNESCAPED_SLASHES);

    }


    public function send_invoice_email(Request $request){
        $invoice_id = $request->input('invoice_id');
        $email_address = $request->input('email_address');

        $data = ['name'=>'foo'];

        $view =  app()->make('view')->make('invoice_pdf', $data)->render();
        
        $pdf = PDF::loadHTML($view);

        $path = base_path().'/public/patient_archive/invoice.pdf';

        $pdf->save($path);

        $message = "Invoice Data";

        $mail = new PHPMailer(true); // notice the \  you have to use root namespace here
        try {
            $mail->isSMTP(); // tell to use smtp
            $mail->CharSet = "utf-8"; // set charset to utf8
            $mail->SMTPAuth = true;  // use smpt auth
            $mail->SMTPSecure = "tls"; // or ssl
            $mail->Host = env('MAIL_HOST');
            $mail->Port = env('MAIL_PORT'); // most likely something different for you. This is the mailtrap.io port i use for testing.
            $mail->Username = env('MAIL_USERNAME');
            $mail->Password = env('MAIL_PASSWORD');
            $mail->setFrom(env('MAIL_FROM'));
            $mail->AddAttachment($path);
            $mail->Subject = "Message From Ehr";
            $mail->MsgHTML($message);
            $mail->addAddress($email_address);
            $mail->send();

        } catch (phpmailerException $e) {
            dd($e);
        } catch (Exception $e) {
            dd($e);
        }

        return response()->json(['status' => true, 'message' => 'Email Send Successfully']);

    }

    public function get_clinical_notes_pdf(Request $request){

        $arr = array();
        $id = $request->input('patient_clinical_notes_id');

        $db = DB::table('patient_clinical_notes')
            ->leftJoin('templates', 'templates.id', '=', 'patient_clinical_notes.template_id')
            ->select('patient_clinical_notes.value', 'templates.template','signoff')
            ->where('patient_clinical_notes.id', $id)->first();

        $clinical_notes_values = json_decode($db->value);

        $template = json_decode($db->template);
        foreach ($template->fields as $temp) {
            foreach ($clinical_notes_values as $k => $v) {
                if ($temp->name == $k) {
                    array_push($arr, ['value' => $v, 'field' => $temp,]);
                }
            }
        }

        $logo_image = url('/') . '/uploaded_images/';

        $patient = DB::table('patient_clinical_notes')
            ->select(DB::raw('patients.id,CONCAT(patients.first_name," ",patients.last_name) AS patient_name,CONCAT("' . $logo_image . '",patients.patient_image) as patient_image,patients.age,patients.date_of_birth,maritial_status.name as marital_status,(CASE WHEN (sex = 1) THEN "Male" ELSE "Female" END) as gender,patient_clinical_notes.diagnosis,patient_clinical_notes.visit_id'))
            ->leftJoin('patients', 'patient_clinical_notes.patient_id', '=', 'patients.id')
            ->leftJoin('maritial_status', 'patients.marital_status', '=', 'maritial_status.id')
            ->where('patient_clinical_notes.id', $id)->first();

       // array_push($arr, ['patient' => $patient]);

        $visit_id = $patient->visit_id;

        $allergies = DB::table('patient_allergies')
            ->select(DB::raw('*'))
            ->where('visit_id', $visit_id)
            ->get();

        $immmunizations = DB::table('patient_immunizations')
            ->select(DB::raw('*'))
            ->where('patient_id', $patient->id)
            ->where('status', 1)
            ->get();

        $active_problems = DB::table('active_problems')
            ->select(DB::raw('*'))
            ->where('patient_id', $patient->id)
            ->where('status', 1)
            ->get();

        $family_history = DB::table('family_history')
            ->select(DB::raw('*'))
            ->where('patient_id', $patient->id)
            ->where('status', 1)
            ->get();


        $orders = DB::table('lab_orders')
            ->select(DB::raw('lab_orders.id,lab_orders.patient_id,labs.name as lab_name'))
            ->leftJoin('labs', 'labs.id', '=', 'lab_orders.lab')
            ->where('lab_orders.patient_id', $patient->id)
            ->where('lab_orders.status', 1)
            ->get();


        $diagnosis = array();


        if($patient->diagnosis !=''){

            $patient_diagnosis  = preg_replace('/[%\[\]\.\(\)%&-]/s', '', $patient->diagnosis);

            $diagnosis_id = explode(',', $patient_diagnosis);

            foreach($diagnosis_id as $id){

                $name = DB::table('diagnosis')
                    ->select('name')
                    ->where('id', $id)->first();

                array_push($diagnosis, ['diagnosis' => $name->name]);

            }

        }
        
        $data = ['data'=>$arr,'patient'=>$patient,'diagnosis'=>$diagnosis,'allergies'=>$allergies,'immunizations'=>$immmunizations,'orders'=>$orders,'active_problems'=>$active_problems,'family_history'=>$family_history];

        $view =  app()->make('view')->make('clinical_notes_pdf', $data)->render();

        $pdf = PDF::loadHTML($view);

        $path = base_path().'/public/patient_archive/clinical_notes.pdf';

        $pdf->save($path);

        $file_archive = url('/').'/patient_archive/clinical_notes.pdf';

        echo json_encode(array(
            'status' => true,
            'data' => $file_archive,
            'is_signup' => $db->signoff

        ), JSON_UNESCAPED_SLASHES);

    }

    public function signoff_lab_report(Request $request){
        $id = $request->input('lab_test_id');
        DB::table('patient_lab_test_values')
              ->where('id', $id)
              ->update(
                  ['signoff' => 1]
              );
        return response()->json(['status' => true, 'message' => 'Report signed off Successfully']);

    }

    public function signoff_clinical_report(Request $request){
        $id = $request->input('patient_clinical_notes_id');
        DB::table('patient_clinical_notes')
              ->where('id', $id)
              ->update(
                  ['signoff' => 1]
              );
        return response()->json(['status' => true, 'message' => 'Report signed off Successfully','is_signoff'=>1]);

    }

    public function get_prescription_pdf(Request $request){

        $prescription_id = $request->input('prescription_id');

        $medication = DB::table('patient_prescription')
            ->leftJoin('patient_prescription_medicine', 'patient_prescription.id', '=', 'patient_prescription_medicine.prescription_id')
            ->select('medication', 'supplements', 'sig','dispense','reffills','pharmacy')
            ->where('patient_prescription.id', $prescription_id)->get();


        $logo_image = url('/') . '/uploaded_images/';

        $patient = DB::table('patient_prescription')
            ->select(DB::raw('patients.id,CONCAT(patients.first_name," ",patients.last_name) AS patient_name,CONCAT("' . $logo_image . '",patients.patient_image) as patient_image,patients.age,patients.date_of_birth,maritial_status.name as marital_status,(CASE WHEN (sex = 1) THEN "Male" ELSE "Female" END) as gender'))
            ->leftJoin('patients', 'patient_prescription.patient_id', '=', 'patients.id')
            ->leftJoin('maritial_status', 'patients.marital_status', '=', 'maritial_status.id')
            ->where('patient_prescription.id', $prescription_id)
            ->first();

        $prescription_notes = DB::table('prescription_notes')
              ->select(DB::raw('note_for_pharmacy'))
              ->where('prescription_id', $prescription_id)
              ->first();


        $data = ['medication'=>$medication,'patient'=>$patient,'prescription_notes'=>$prescription_notes];

        $view = app()->make('view')->make('prescription_pdf',$data)->render();

        $pdf = PDF::loadHTML($view);

        $path = base_path() . '/public/patient_archive/prescription_notes.pdf';

        $pdf->save($path);

        $file_archive = url('/') . '/patient_archive/prescription_notes.pdf';

        echo json_encode(array(
            'status' => true,
            'data' => $file_archive

        ), JSON_UNESCAPED_SLASHES);
    }
}