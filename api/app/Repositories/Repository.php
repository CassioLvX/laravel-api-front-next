<?php

namespace App\Repositories;

Class Repository implements RepositoryInterface
{
    public function getById(string $id)
    {
        return $this->model->find($id);
    }

    public function getAll()
    {
        return $this->model->all();
    }

    public function getByAttr(string $attr, string $value)
    {
        return $this->model->where($attr, $value)->get();
    }

    public function getFirstByAttr(string $attr, string $value)
    {
        return $this->model->where($attr, $value)->first();
    }

    public function save(array $data)
    {
        return $this->model->create($data);
    }

    public function update(string $id, array $data)
    {
        return $this->model->where('id', $id)->update($data);
    }
    public function delete(string $id)
    {
        return $this->model->where('id', $id)->delete();
    }

    public function getByAttributeIn(string $field, array $attributes)
    {
        return $this->model->whereIn($field, $attributes)->get();
    }
}
