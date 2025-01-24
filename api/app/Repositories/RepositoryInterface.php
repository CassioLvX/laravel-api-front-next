<?php

namespace App\Repositories;

interface RepositoryInterface
{
    public function getById(string $id);
    public function getAll();
    public function getByAttr(string $attr, string $value);
    public function getFirstByAttr(string $attr, string $value);
    public function save(array $data);
    public function update(string $id, array $data);
    public function delete(string $id);
    public function getByAttributeIn(string $field, array $attributes);
}
