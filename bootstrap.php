<?php namespace Davis\Split;

use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {
    $events->subscribe(Listeners\AddClientAssets::class);
    $events->subscribe(Listeners\AddSplitApi::class);
    $events->subscribe(Listeners\CreatePostWhenSplit::class);
};
