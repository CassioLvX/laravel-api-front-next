<?php

namespace App\Repositories;

Class Repository implements RepositoryInterface
{
    public function getById(string $id)
    {
        return $this->model->find($id);
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
}
