<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => 'required|min:3',
            'description' => 'nullable',
            'price' => 'required|numeric|gt:0',
            'image_path' => 'nullable|mimes:jpeg,png|max:1024',
        ];

        if ($this->isMethod('post')) {
            $rules['image_path'] = 'required|mimes:jpeg,png|max:1024';
        }

        return $rules;
    }
}
