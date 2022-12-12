<?php

namespace App\Http\Controllers;

use App\Models\Sample;
use Illuminate\Http\Request;

class SampleController extends Controller
{
    public function getMessage(Request $request) {

        $samples = Sample::all();

        return response()->json($samples, 201);
    }
}
