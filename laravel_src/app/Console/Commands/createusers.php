<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class createusers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'createusers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'userを100名作成';

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
        for($i = 0; $i < 100; $i++){
            $newtalk = User::create([
                'username' => 'user' .$i,
            ]);
        }
        $end = microtime(true) - $start;
        echo "end:" . $end . "[sec]\n";
    }
}
