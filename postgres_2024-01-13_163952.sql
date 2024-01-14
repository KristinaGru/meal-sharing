-- Generated by the database client.
CREATE TABLE meal(
    id SERIAL NOT NULL,
    title varchar(200) NOT NULL,
    description text NOT NULL,
    location varchar(100),
    when timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "max_reservations" integer NOT NULL,
    price numeric,
    "created_date" date DEFAULT CURRENT_DATE,
    PRIMARY KEY(id)
);

-- Generated by the database client.
CREATE TABLE reservation(
    id SERIAL NOT NULL,
    "number_of_guests" integer NOT NULL,
    "meal_id" integer NOT NULL,
    "created_date" timestamp without time zone DEFAULT CURRENT_DATE,
    "contact_phonenumber" varchar(50),
    "contact_name" varchar(100),
    "contact_email" varchar(100),
    PRIMARY KEY(id),
    CONSTRAINT reservation_meal_id_fkey FOREIGN key("meal_id") REFERENCES meal(id)
);

-- Generated by the database client.
CREATE TABLE review(
    id SERIAL NOT NULL,
    title varchar(100) NOT NULL,
    description text NOT NULL,
    "meal_id" integer NOT NULL,
    stars integer,
    "created_date" date DEFAULT CURRENT_DATE,
    PRIMARY KEY(id),
    CONSTRAINT review_meal_id_fkey FOREIGN key("meal_id") REFERENCES meal(id)
);

INSERT INTO meal(title,description,location,when,max_reservations,price,created_date) VALUES('Classic Burger','A juicy burger with all the fixings.','Copenhagen','2023-10-15 19:30:00',14,'150.00','2023-08-27'),('Pasta Carbonara','Creamy pasta with bacon and cheese.','Aarhus','2023-10-10 18:00:00',18,'120.00','2023-08-27'),('Grilled Chicken','Tender grilled chicken breast with vegetables.','Odense','2023-11-20 20:15:00',11,'180.00','2023-08-27'),('Vegetable Stir-Fry','A colorful mix of stir-fried vegetables.','Aalborg','2023-10-25 17:45:00',16,'100.00','2023-08-27'),('Beef Tacos','Savory beef tacos with salsa and guacamole.','Esbjerg','2023-11-05 19:30:00',15,'130.00','2023-08-27'),('Salmon Fillet','Freshly grilled salmon fillet with dill sauce.','Roskilde','2023-10-08 18:45:00',10,'190.00','2023-08-27'),('Margherita Pizza','Classic pizza topped with tomatoes and mozzarella.','Horsens','2023-12-01 20:00:00',19,'160.00','2023-08-27'),('Mushroom Risotto','Creamy risotto with assorted mushrooms.','Vejle','2023-10-18 19:15:00',12,'140.00','2023-08-27'),('BBQ Ribs','Tangy BBQ ribs served with coleslaw.','Randers','2023-11-15 18:30:00',13,'220.00','2023-08-27'),('Greek Salad','Fresh salad with feta cheese and olives.','Kolding','2023-10-30 20:15:00',17,'100.00','2023-08-27'),('Fish and Chips','Crispy fish and fries with tartar sauce.','Silkeborg','2023-11-10 19:00:00',14,'130.00','2023-08-27'),('Chicken Caesar Wrap','Grilled chicken Caesar wrap with dressing.','Helsingør','2023-11-25 18:45:00',16,'110.00','2023-08-27'),('Vegetarian Curry','Spicy vegetable curry with rice.','Herning','2023-12-05 20:30:00',10,'120.00','2023-08-27'),('Steak Frites','Succulent steak with crispy french fries.','Fredericia','2023-10-22 19:00:00',18,'210.00','2023-08-27'),('Caprese Sandwich','Fresh mozzarella and tomato sandwich.','Hjørring','2023-11-08 18:15:00',11,'80.00','2023-08-27'),('Vegan Buddha Bowl','Colorful vegan bowl with assorted grains and veggies.','Hobro','2023-12-10 20:00:00',12,'130.00','2023-08-27'),('Sushi Platter','Assortment of fresh sushi rolls.','Skive','2023-11-15 19:30:00',15,'220.00','2023-08-27'),('Spaghetti Bolognese','Hearty spaghetti with rich meat sauce.','Slagelse','2023-11-30 18:45:00',13,'150.00','2023-08-27'),('Tofu Stir-Fry','Stir-fried tofu with vegetables and soy sauce.','Frederikshavn','2023-12-08 20:15:00',14,'110.00','2023-08-27'),('Chocolate Fondue','Decadent chocolate fondue with fruit and marshmallows.','Nykøbing Falster','2023-10-20 19:00:00',17,'180.00','2023-08-27'),('Kebab','Kebab with beef and garlic sauce','Odense','2023-09-15 16:00:00',8,'75.00','2023-08-28');

INSERT INTO reservation(number_of_guests,meal_id,created_date,contact_phonenumber,contact_name,contact_email) VALUES(6,4,'2023-08-27 00:00:00','25242322','John Smith','john.smith@email.com'),(6,4,'2023-08-27 00:00:00','25242322','John Smith','john.smith@email.com'),(10,7,'2023-08-27 00:00:00','98765432','Jane Doe','jane.doe@email.com'),(8,11,'2023-08-27 00:00:00','56473829','Michael Johnson','michael.johnson@email.com'),(5,14,'2023-08-27 00:00:00','12345678','Emma Brown','emma.brown@email.com'),(7,19,'2023-08-27 00:00:00','87654321','Sophia Wilson','sophia.wilson@email.com'),(12,2,'2023-08-27 00:00:00','23456789','William Taylor','william.taylor@email.com'),(9,15,'2023-08-27 00:00:00','34567890','Olivia Anderson','olivia.anderson@email.com'),(15,8,'2023-08-27 00:00:00','78901234','James Martinez','james.martinez@email.com'),(8,6,'2023-08-27 00:00:00','45678901','Ava Harris','ava.harris@email.com'),(5,13,'2023-08-27 00:00:00','98765432','Liam Jones','liam.jones@email.com'),(2,10,'2023-08-28 00:00:00','','Elton','elton@email.com'),(5,13,'2023-08-28 00:00:00','','Brigitte Johnson','bjohnson@email.com');

INSERT INTO review(title,description,meal_id,stars,created_date) VALUES('Delicious Burger!','The Classic Burger was incredibly delicious!',1,5,'2023-08-27'),('Loved the Pasta','The Pasta Carbonara was creamy and delightful.',2,4,'2023-08-27'),('Perfect Chicken','The Grilled Chicken was tender and perfectly cooked.',3,5,'2023-08-27'),('Vibrant Vegetable Stir-Fry','The Vegetable Stir-Fry had a colorful and vibrant mix.',4,4,'2023-08-27'),('Tasty Tacos','The Beef Tacos were savory and flavorful.',5,4,'2023-08-27'),('Salmon Heaven','The Salmon Fillet was a heavenly delight.',6,5,'2023-08-27'),('Best Pizza!','The Margherita Pizza was the best pizza I ever had!',7,5,'2023-08-27'),('Creamy Risotto','The Mushroom Risotto was wonderfully creamy.',8,4,'2023-08-27'),('Tangy Ribs','The BBQ Ribs had a tangy and delightful flavor.',9,4,'2023-08-27'),('Refreshing Salad','The Greek Salad was fresh and refreshing.',10,4,'2023-08-27'),('Crispy Fish','The Fish and Chips had perfectly crispy fish.',11,4,'2023-08-27'),('Amazing Caesar Wrap','The Chicken Caesar Wrap was amazing!',12,5,'2023-08-27'),('Spicy Curry','The Vegetarian Curry had a spicy kick that I loved.',13,4,'2023-08-27'),('Succulent Steak','The Steak Frites had succulent and juicy steak.',14,5,'2023-08-27'),('Fresh Caprese','The Caprese Sandwich had fresh mozzarella and tomatoes.',15,4,'2023-08-27'),('Colorful Bowl','The Vegan Buddha Bowl was a colorful and tasty delight.',16,4,'2023-08-27'),('Sushi Delight','The Sushi Platter was a delightful assortment.',17,5,'2023-08-27'),('Hearty Spaghetti','The Spaghetti Bolognese was hearty and rich.',18,4,'2023-08-27'),('Tasty Tofu','The Tofu Stir-Fry with vegetables was delicious.',19,4,'2023-08-27'),('Decadent Fondue','The Chocolate Fondue was a decadent treat.',20,5,'2023-08-27'),('Not Impressed','The Pasta Carbonara did not meet my expectations.',2,2,'2023-08-27'),('Unsatisfactory','The Mushroom Risotto was not up to par.',8,1,'2023-08-27'),('Disappointing Wrap','The Chicken Caesar Wrap was disappointing in taste.',11,2,'2023-08-27'),('Below Average','The Vegan Buddha Bowl was below average in flavor.',16,2,'2023-08-27'),('Could Be Better','The Tofu Stir-Fry had room for improvement.',19,3,'2023-08-27'),('Displeasing Fondue','The Chocolate Fondue was not pleasing at all.',20,1,'2023-08-27'),('Ok','Good quality for the price',21,4,'2023-08-28');