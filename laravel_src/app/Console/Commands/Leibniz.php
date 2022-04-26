<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class Leibniz extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'Leibniz';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'ライプニッツ級数';

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
        $pi4 = 0;
        $start = microtime(true);

        for($i = 0;$i < 100000000;$i++){
            $pi4 += (1 / ($i * 4 + 1) - 1 / ($i * 4 + 3));
        }

        $end = microtime(true) - $start;
        echo "end:" . $end . "[sec]\n";
        echo $pi4 * 4;
    }
}