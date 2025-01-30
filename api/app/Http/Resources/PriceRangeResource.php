<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PriceRangeResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'minValue' => $this->minValue,
            'maxValue' => $this->maxValue,
        ];
    }
}
