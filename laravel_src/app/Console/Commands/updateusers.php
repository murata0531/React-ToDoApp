<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class updateusers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'updateusers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '全てのuserの名前を変更';

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
            $user->username = 'update';
            $user->save();
            echo $user->username . "\n";
        }
        $end = microtime(true) - $start;
        echo "end:" . $end . "[sec]\n";
    }
}
