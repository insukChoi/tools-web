<script>
    import { Textarea, P, Button, Label } from 'flowbite-svelte'
    // import SQLMongoParser from './sql-to-mongo-wrapper.js';

    let mysqlQuery;
    let mongoQuery;

    const handleSubmit = () => {
        mongoQuery = mysqlQuery;
    };
</script>
<br>
<P size="3xl">Mysql Query</P>
<form on:submit|preventDefault={handleSubmit}>
  <Textarea class="mb-4" placeholder="Write a MongoQuery" bind:value={mysqlQuery}>
    <div slot="footer" class="flex items-center justify-between">
        <Button type="submit">Convert Mongo Query</Button>
    </div>
  </Textarea>
</form>
<br>

<P size="3xl">Mongo Query</P>
<Textarea id="textarea-id" placeholder="..." rows="4" bind:value="{mongoQuery}" readonly/>