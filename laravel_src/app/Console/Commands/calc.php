<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class calc extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'calc';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '年率計算をする';

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
        
        // $repeat_cnt　= $this->ask('繰り返し回数:');
        // $principal = $this->ask('元本:');
        // $goal = $this->ask('目標金額:');

        $repeat_cnt = 100;
        $principal = 500000;
        $goal = 45000000;
        $start = microtime(true);
        $this->Measure($repeat_cnt,$principal,$goal);
        $end = microtime(true) - $start;

        echo "end:" . $end . "[sec]\n";
    }

    function Measure($repeat_cnt,$principal,$goal){
        for($i = 0; $i < $repeat_cnt; $i++){
            $age_cnt = 0;
            $inner_principal = $principal;
            while(true){
                $inner_principal = $inner_principal * 1.05;
                $age_cnt++;
                if($inner_principal >= $goal){
                    echo $inner_principal . "\n";
                    echo $age_cnt . "\n";
                    break;
                }
            }
        }
    }
}