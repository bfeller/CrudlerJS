# CrudlerJS
Trying to CRUD localStorage and make it more convenient to use. Use it to create "Tables" and "Rows" like you would in your favorite relational DB but not cause it kinda acts like its own crazy thang. 

**STILL VERY MUCH UNFINISHED**

Hoping to add features like search in the future.... when I get around to it.

# How to Use

```javascript
Crudler(crud, table, row_id, column, val)
```

## Create

Let use the example of using it for game storage...

I want to save a health and position for my character:

```javascript
Crudler('create', 'character_stats', null, null, {health: 100, pos_x: 12, pox_y: 12})
```

Optionally there are responses if you are trying to debug your code you can wrap it in a console.log and add '.news' at the end like this:

```javascript
console.log(Crudler('create', 'character_stats', null, null, {health: 100, pos_x: 12, pox_y: 12}).news)
```
and you'll get something like: 'New row successfully added to character_stats'

Hopefully you can intuit the pattern there.

## Read

Okay... You did it, now you want to "display that health brah", or however you said it. I'm not judging.

```javascript
Crudler('read', 'character_stats', '1', 'health', null).response
```

The 1 is just simply an assumption that you only ran the above code once. Because then that data would be in the first row. Then it's the field I want from the row. in this case 'health'.

If I wanted to I could add multiple players this way by adding more rows.

## Update

Oh no your character is hit by a monster! You have to remove some health or mana or whatever.

```javascript
Crudler('update', 'character_stats', '1', 'health', 87)
```

Wooo... you did it... so proud.

## Delete

That monster just didn't stop, oh gawd, so bloody, and your character is dead. Let's delete evrything and start a new game:

```javascript
Crudler('delete', null, null, null, null)
```
Or if you just wanted to delete all the character stats but the other stuff that you created sould stay.

```javascript
Crudler('delete', 'character_stats', null, null, null)
```

Turns out, only player one died:

```javascript
Crudler('delete', 'character_stats', 1, null, null)
```

Aaaactually, he's just turned into a shadow monster and can't be killed by conventional means:

```javascript
Crudler('delete', 'character_stats', 1, 'health', null)
```

## Other important notes:

All Crudler calls return 3 response methods:
  * '.news' - Returns a verbose response like "You need to specify a table"
  * '.status' - This will either be 'incomplete', 'Success', or 'Error'
  * '.reponse' - Will always respond with your data... yaay.
