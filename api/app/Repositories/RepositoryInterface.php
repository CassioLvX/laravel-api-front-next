<?php

namespace App\Repositories;

interface RepositoryInterface
{
    public function getById(string $id);
    public function save(array $data);
    public function update(string $id, array $data);
    public function delete(string $id);
}
