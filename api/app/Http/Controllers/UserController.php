<?php

namespace App\Http\Controllers;

use Auth;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

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
            Log::error('Failed to login' . self::class, [
                'code' => 'failed_to_login' . self::class,
                'exception' => $e,
            ]);
            return response()->json([
                'message'=>'Failed to login',
                'errorType' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function getUser(Request $request)
    {
        try {
            $user = Auth::user();

            return response()->json(  $user,Response::HTTP_OK );
        } catch (Exception $e) {
            Log::error('Failed to get user data' . self::class, [
                'code' => 'failed_to_get_user_data' . self::class,
                'exception' => $e,
            ]);
            return response()->json([
                'message'=>'Failed to get user data',
                'errorType' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}
