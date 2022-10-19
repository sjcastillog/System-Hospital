<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthenticatedSessionController extends Controller
{
    public function Store(Request $request){

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
 
        if (Auth::attempt($credentials)) {
            return response()->json(Auth::user(), 200);
            $request->session()->regenerate();
        }
 
        return response()->json([
            'Error'=>'No validado'
        ]);

    }

    public function destroy(Request $request){

        Auth::guard('web')->logout();
        // $request->session()->invalidate();

        return response()->json([
            'message'=>'LOGOUT SUCCESS'
        ]);
    }
}
