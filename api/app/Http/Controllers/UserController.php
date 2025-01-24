<?php

namespace App\Http\Controllers;

use Auth;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    public function login(Request $request)
    {
        try {
            $credentials = $request->only('email', 'password');

            if (Auth::attempt($credentials)) {
                $user = Auth::user();

                return response()->json([
                        'token' => $user->createToken('auth_token')->plainTextToken,
                        'type' => 'Bearer',
                    ],
                    Response::HTTP_OK );
            }

            return response()->json([
                    'error' => 'Unauthorized: Invalid email or password'
                ],
                Response::HTTP_UNAUTHORIZED);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }
}
