<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\SampleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get("/getSample", [SampleController::class, "getMessage"]);

Route::post("/login", [LoginController::class, "login"]);
Route::post("/logout", [LoginController::class, "logout"]);
Route::post("/register", [LoginController::class, "register"]);

// 認証済みでないと許可しない
Route::group(["middleware" => ["auth:sanctum"]], function () {
  // Route::get("/posts", [PostController::class, "index"]);
  // Route::get("/posts/{postId?}/comments", function (Request $request) {
  // });
});