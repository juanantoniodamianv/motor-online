INSERT INTO
    public.provinces (name)
VALUES
    ('Buenos Aires'),
    ('Catamarca'),
    ('Chaco'),
    ('Chubut'),
    ('Córdoba'),
    ('Corrientes'),
    ('Entre Ríos'),
    ('Formosa'),
    ('Jujuy'),
    ('La Pampa'),
    ('La Rioja'),
    ('Mendoza'),
    ('Misiones'),
    ('Neuquén'),
    ('Río Negro'),
    ('Salta'),
    ('San Juan'),
    ('San Luis'),
    ('Santa Cruz'),
    ('Santa Fe'),
    ('Santiago del Estero'),
    ('Tierra del Fuego'),
    ('Tucumán');

-- Necesitamos actualizar esta migración a futuro para que contenga todas las ciudades de las provincias existentes en la tabla de arriba
INSERT INTO public.cities (name, provinceid)
SELECT 
    name,
    (SELECT id FROM public.provinces WHERE name = 'Misiones' LIMIT 1) AS provinceid
FROM (
    VALUES
        ('Posadas'),
        ('Garupá'),
        ('Fachinal'),
        ('Bonpland'),
        ('Candelaria'),
        ('Cerro Corá'),
        ('Loreto'),
        ('Mártires'),
        ('Profundidad'),
        ('Santa Ana'),
        ('Apóstoles'),
        ('Azara'),
        ('San José'),
        ('Tres Capones'),
        ('Concepción de la Sierra'),
        ('Santa María'),
        ('Almafuerte'),
        ('Arroyo del Medio'),
        ('Caá Yari'),
        ('Cerro Azul'),
        ('Dos Arroyos'),
        ('Gobernador López'),
        ('Leandro N. Alem'),
        ('Olegario Víctor Andrade'),
        ('Florentino Ameghino'),
        ('Itacuararé'),
        ('Mojón Grande'),
        ('San Javier'),
        ('San Ignacio'),
        ('Corpus'),
        ('Gobernador Roca'),
        ('Colonia Polana'),
        ('General Urquiza'),
        ('Hipólito Yrigoyen'),
        ('Jarín América'),
        ('Santo Pipó'),
        ('Campo Ramón'),
        ('Campo Viera'),
        ('Colonia Alberdi'),
        ('General Alvear'),
        ('Guaraní'),
        ('Los Helechos'),
        ('Oberá'),
        ('Panambí'),
        ('San Martín'),
        ('Alba Posse'),
        ('Colonia Aurora'),
        ('25 de Mayo'),
        ('Dos de Mayo'),
        ('Campo Grande'),
        ('Aristóbulo del Valle'),
        ('El Soberbio'),
        ('San Vicente'),
        ('Caraguatay'),
        ('Puerto Piray'),
        ('Montecarlo'),
        ('San Pedro'),
        ('Pozo Azul'),
        ('Colonia Delicia'),
        ('Colonia Victoria'),
        ('Eldorado'),
        ('9 de Julio'),
        ('Santiago de Liniers'),
        ('Bernardo de Irigoyen'),
        ('Comandante Andresito'),
        ('San Antonio'),
        ('Wanda'),
        ('Puerto Esperanza'),
        ('Puerto Iguazú'),
        ('Puerto Libertad'),
        ('Capioví'),
        ('El Alcázar'),
        ('Garuhapé'),
        ('Puerto Leoni'),
        ('Puerto Rico'),
        ('Ruiz de Montoya')
) AS cities(name);

INSERT INTO public.cities (name, provinceid)
    SELECT 
        name,
        (SELECT id FROM public.provinces WHERE name = 'Buenos Aires' LIMIT 1) AS provinceid
FROM (
    VALUES
        ('Lanús'),
        ('La Plata'),
        ('Lomas de Zamora'),
        ('Luján'),
        ('Merlo'),
        ('Morón'),
        ('Pilar'),
        ('Quilmes'),
        ('Tigre'),
        ('Vicente López'),
        ('Zarate')
) AS cities(name);

INSERT INTO public.cities (name, provinceid)
    SELECT 
        name,
        (SELECT id FROM public.provinces WHERE name = 'Chaco' LIMIT 1) AS provinceid
FROM (
    VALUES
        ('Resistencia'),
        ('Saenz Peña'),
        ('Villa Ángela'),
        ('Gral. Jose de San Martin')
) AS cities(name);

INSERT INTO public.cities (name, provinceid)
    SELECT 
        name,
        (SELECT id FROM public.provinces WHERE name = 'Corrientes' LIMIT 1) AS provinceid
FROM (
    VALUES
        ('Beron de Aztrada'),
        ('Caá Catí'),
        ('Capital'),
        ('Carlos Pellegrini'),
        ('Concepción'),
        ('Curuzú Cuatiá'),
        ('Empedrado'),
        ('Esquina'),
        ('Itatí'),
        ('Ituzaingó'),
        ('Santo Tomé'),
        ('Yapeyú'),
        ('Itá Ibaté'),
        ('Paso de los Libres')
) AS cities(name);

INSERT INTO public.cities (name, provinceid)
    SELECT 
        name,
        (SELECT id FROM public.provinces WHERE name = 'Entre Ríos' LIMIT 1) AS provinceid
FROM (
    VALUES
        ('Federación'),
        ('Federal'),
        ('Colón'),
        ('Concordia'),
        ('Diamante'),
        ('Gualeguay'),
        ('Gualeguaychú'),
        ('Paraná'),
        ('San Salvador'),
        ('Uruguay'),
        ('Victoria'),
        ('Villaguay')
) AS cities(name);

INSERT INTO public.cities (name, provinceid)
    SELECT 
        name,
        (SELECT id FROM public.provinces WHERE name = 'Formosa' LIMIT 1) AS provinceid
FROM (
    VALUES
        ('Comandante'),
        ('Clorinda'),
        ('Espinillo'),
        ('Cdte. Fontana'),
        ('Formosa'),
        ('General Enrique Mosconi'),
        ('Ingeniero Juárez'),
        ('Laguna Yema'),
        ('Pirané'),
        ('San Francisco de Laishí')
) AS cities(name);

INSERT INTO public.cities (name, provinceid)
    SELECT 
        name,
        (SELECT id FROM public.provinces WHERE name = 'Santa Fe' LIMIT 1) AS provinceid
FROM (
    VALUES
        ('Capital'),
        ('Rafaela'),
        ('Reconquista'),
        ('Rosario'),
        ('Venado Tuerto'),
        ('Villa Constitución')
) AS cities(name);


INSERT INTO public.vehicle_categories (id, name)
    VALUES
        (1, 'Autos y Camionetas'),
        (2, 'Camiones y Buses'),
        (3, 'Vehiculos de agua'),
        (4, 'Maquinaria'),
        (5, 'Motos');