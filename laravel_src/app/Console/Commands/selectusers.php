<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class selectusers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'selectusers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '全ユーザを取得';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $start = microtime(true);
        $users = User::get(); 
        foreach ($users as $user){
            echo $user->username . "\n";
        }
        $end = microtime(true) - $start;
        echo "end:" . $end . "[sec]\n";
    }
}
