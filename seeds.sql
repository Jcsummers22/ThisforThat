INSERT INTO thisforthat.users(userName, firstName, lastName, email, location)
VALUES ("launaeze", "Laura", "Unaeze", "email@email.com", "Phoenix, AZ");

INSERT INTO thisforthat.items(item_name, category, owner_id, created_at)
VALUES ("boots", "clothes", 1, '2017-02-04');

INSERT INTO thisforthat.items(item_name, category, owner_id, create_at)
VALUES ("socks", "clothes", 2, '2016-02-02');

INSERT INTO thisforthat.items(item_name, category, owner_id, create_at)
VALUES ("hat", "clothes", 3, '2015-05-06');


SELECT * FROM thisforthat.items;
SELECT * FROM thisforthat.users;