<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * @OA\Info(
 *     version="8.3.1",
 *     title="API設計書",
 *     description="APIドキュメントとして参照　テスト実行ができます。",
 * ),
 * @OAS\SecurityScheme(
 *      securityScheme="bearer_token",
 *      type="http",
 *      scheme="bearer"
 * )
 */
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * @OA\Get(
     *     path="/hello",
     *     operationId="hello",
     *     tags={"タグ"},
     *     summary="ハロー",
     *     description="こんにちは",
     *     @OA\Response(
     *         response=200,
     *         description="成功",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 description="メッセージ",
     *                 example="Hello"
     *             )
     *         )
     *     )
     * )
     */
    public function index()
    {
        return ['message' => 'Hello'];
    }
}
