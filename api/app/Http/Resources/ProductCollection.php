<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductCollection extends ResourceCollection
{
    public $collects = ProductResource::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection,
            'meta' => [
                'total' => $this->total(),
                'current_page' => $this->currentPage(),
                'per_page' => $this->perPage(),
                'last_page' => $this->lastPage(),
                'next_page_url' => $this->nextPageUrl(),
                'prev_page_url' => $this->previousPageUrl(),
                'filters' => [
                    'min_price' => $request->min_price,
                    'max_price' => $request->max_price,
                ],
            ],
        ];
    }
}
