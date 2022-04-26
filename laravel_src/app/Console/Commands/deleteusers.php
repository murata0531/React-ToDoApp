<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;


class deleteusers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deleteusers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'userを全て削除する';

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
        $items = User::query()->delete();
        echo $items . "\n";
        $end = microtime(true) - $start;
        echo "end:" . $end . "[sec]\n";
    }
}
