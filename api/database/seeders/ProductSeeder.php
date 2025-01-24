<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use \Illuminate\Support\Str;
use Faker\Factory as Faker;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        Product::create([
            'id' =>Str::uuid()->toString(),
            'name' => 'Caderno A5 em palha e algodão canvas com folhas pautadas',
            'description' => 'Caderno A5 de capa dura em palha e algodão canvas. Contém 96 folhas pautadas, fita separadora, elástico e suporte para esferográfica (não inclusa). 150 x 210 mm',
            'price' => $faker->randomFloat(2, 10, 500),
            'image_path' => 'https://app3.brinde.me/exemplo/assets/shared/products/medium/caderno-a5-em-palha-e-algodao-canvas-com-folhas-pautadas-3.webp',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Product::create([
            'id' =>Str::uuid()->toString(),
            'name' => "Mouse wireless dobrável 2'4G",
            'description' => "Mouse wireless dobrável 2'4G. em ABS com acabamento emborrachado. Incluso 2 pilhas AAA. Fornecido em caixa transparente. 60 x 112 x 20 mm | Caixa: 75 x 130 x 44 mm",
            'price' => $faker->randomFloat(2, 10, 500),
            'image_path' => 'https://app3.brinde.me/exemplo/assets/shared/products/large/mouse-wireless-dobravel-24g.webp',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Product::create([
            'id' =>Str::uuid()->toString(),
            'name' => 'Carregador wireless rápido em ABS',
            'description' => 'Carregador wireless super rápido em ABS com acabamento emborrachado. Potência máxima de carregamento de 15W. Incluso cabo USB de 1 m para carregar. Compatível com smartphones com tecnologia de carregamento sem fios. Fornecido em caixa presente. ø99 x 9 mm | Cabo: 1000 mm',
            'price' => $faker->randomFloat(2, 10, 500),
            'image_path' => 'https://app3.brinde.me/exemplo/assets/shared/products/large/carregador-wireless-rapido-em-abs-3.webp',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Product::create([
            'id' =>Str::uuid()->toString(),
            'name' => 'Caixa esterilizadora UV com carregador wireless Fast em ABS e PC',
            'description' => "Caixa esterilizadora em ABS e PC com combinação entre radiação UVC e UVA que permite a eliminação de um numero significativo de bactérias. A caixa possui 2 leds UV no interior com uma potência total de 2W, e foi especialmente desenhada para a eliminação de bactérias em objetos de uso diário, como: chaves, celulares, smartphones, máscaras, óculos, comandos, jóias, e outros pequenos utensílios. Eficiência de 70% com apenas 1 ciclo de 5 minutos, e 99.9% com dois ciclos de 5 minutos. Possui um sensor de segurança que desliga de imediato as lâmpadas assim que é aberta a caixa. A parte superior da caixa Incluso um carregador wireless de carregamento rápido (10W), com entrada de 5V/3A e porta de carregamento USB tipo C. Incluso cabo de 1 metro. Fornecida em caixa presente. 210 x 120 x 55 mm | Interior: 190 x 95 x 20 mm | Caixa: 240 x 130 x 71 mm",
            'price' => $faker->randomFloat(2, 10, 500),
            'image_path' => 'https://app3.brinde.me/exemplo/assets/shared/products/large/caixa-esterilizadora-uv-com-carregador-wireless-fast-em-abs-e-pc-3.webp',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Product::create([
            'id' =>Str::uuid()->toString(),
            'name' => "Bateria portátil em ABS 100% reciclado e bateria em lítio 30'000 mAh",
            'description' => "Bateria portátil em ABS 100% reciclado. Bateria em lítio com capacidade de 30'000 mAh e tempo de vida ≥ 300 ciclos. Possui entrada micro-USB e USB-C, 4 saídas USB-A e uma saída USB-C. A parte frontal tem uma tela de LED com informações do nível de carga da bateria. Incluso cabo USB-C para carregamento da bateria. Fornecida em caixa presente de papel kraft. 143 x 69 x 41 mm | Caixa: 75 x 150 x 45 mm",
            'price' => $faker->randomFloat(2, 10, 500),
            'image_path' => 'https://app3.brinde.me/exemplo/assets/shared/products/large/bateria-portatil-em-abs-100-reciclado-e-bateria-em-litio-30000-mah-3.webp',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Product::create([
            'id' =>Str::uuid()->toString(),
            'name' => 'Mala de viagem executivo em ABS e PC com interior forrado',
            'description' => 'Mala de viagem executivo em ABS e PC com interior forrado, com divisória. Fecho de segurança com senha na lateral, 4 rodas duplas giratórias e pega extensível em alumínio, com mola (altura pega estendida até 510 mm). A mala tem capacidade até 33 L e peso de 2.70 kg. 335 x 550 x 230 mm',
            'price' => $faker->randomFloat(2, 10, 500),
            'image_path' => 'https://app3.brinde.me/exemplo/assets/shared/products/large/mala-de-viagem-executivo-em-abs-e-pc-com-interior-forrado-4.webp',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Product::create([
            'id' =>Str::uuid()->toString(),
            'name' => "Mochila para notebook 15'6'' em 840D jacquard",
            'description' => "Mochila para notebook em 840D jacquard com dois compartimentos forrados. O compartimento posterior tem duas divisórias almofadadas para notebook até 15'6'' e tablet 10'5''. O compartimento frontal tem diversos bolsos interiores. Mochila com 3 bolsos frontais e 2 bolsos laterais, parte posterior almofadada, com sistema de apoio acolchoado para as costas e alças almofadadas. Placa metálica removível com imã, para fácil gravação. Capacidade até 25 L. 320 x 450 x 190 mm | Placa: 50 x 20 mm",
            'price' => $faker->randomFloat(2, 10, 500),
            'image_path' => 'https://app3.brinde.me/exemplo/assets/shared/products/large/mochila-para-notebook-156-em-840d-jacquard-3-2.webp',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Product::create([
            'id' =>Str::uuid()->toString(),
            'name' => 'Conjunto de roller e esferográfica em metal',
            'description' => 'Conjunto de roller e esferográfica em metal, ambos com clipe e escrita a preto. A esferográfica é de mecanismo twist e permite até 1.5 km escrita. Incluso estojo almofadado. ø13 x 136 mm | Estojo: 185 x 75 x 31 mm',
            'price' => $faker->randomFloat(2, 10, 500),
            'image_path' => 'https://app3.brinde.me/exemplo/assets/shared/products/large/conjunto-de-roller-e-esferografica-em-metal-1-3.webp',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Product::create([
            'id' =>Str::uuid()->toString(),
            'name' => 'Conjunto de roller e esferográfica em metal',
            'description' => 'Conjunto de esferográfica com mecanismo twist e roller em metal com clipe e detalhes em dourado. Fornecido em estojo almofadado. ø11 x 140 | Caixa: 180 x 57 x 25 mm',
            'price' => $faker->randomFloat(2, 10, 500),
            'image_path' => 'https://app3.brinde.me/exemplo/assets/shared/products/large/conjunto-de-roller-e-esferografica-em-metal-2-4.webp',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Product::create([
            'id' =>Str::uuid()->toString(),
            'name' => 'Kit churrasco com 4 utensílios',
            'description' => 'Kit churrasco composto por 4 utensílios: faca, garfo e pinça em aço inox e madeira de Seringueira e uma luva de cozinha. O estojo dobrável em 600D pode ser convertível em avental para sua proteção. Certificação EU Food Grade. Dobrado e fechado: 130 x 480 mm',
            'price' => $faker->randomFloat(2, 10, 500),
            'image_path' => 'https://app3.brinde.me/exemplo/assets/shared/products/large/kit-churrasco-com-4-utensilios-3.webp',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Product::create([
            'id' =>Str::uuid()->toString(),
            'name' => 'Caderno A6 em bambu com folhas pautadas recicladas',
            'description' => 'Caderno A6 espiral de capa dura em bambu. Com 70 folhas pautadas de papel reciclado e suporte para esferográfica. Esferográfica em bambu inclusa. A cor e o resultado da impressão nos materiais naturais pode variar entre produtos. 105 x 148 mm',
            'price' => $faker->randomFloat(2, 10, 500),
            'image_path' => 'https://app3.brinde.me/exemplo/assets/shared/products/large/caderno-a6-em-bambu-com-folhas-pautadas-recicladas-3.webp',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

    }
}
