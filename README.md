## Server side Testing

### Setup Steps

1. Clone down this repo

1. run `npm i`

1. Create a database called `tv-shows`

```sh
$ createdb tv_shows
```

1. Run the knex migrations and seed

```sh
$ knex migrate: latest -env development
$ knex seed:run
```


