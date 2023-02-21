<script lang="ts">
    import { Textarea, P, Button } from 'flowbite-svelte'

    let mongoText = null;

    async function handleSubmit(event: Event) {
      const form = event.target as HTMLFormElement
      const data = new FormData(form)

      const res = await fetch("/api/convertToMongo", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        const { mongoQuery } = await res.json();;
        mongoText = JSON.stringify(mongoQuery, null, 4)
      }
    }
</script>

<br>
<P size="3xl">Mysql Query</P>
<form on:submit|preventDefault={handleSubmit}>
  <Textarea class="mb-4" placeholder="Write a MySQL Query" name="mysqlText">
    <div slot="footer" class="flex items-center justify-between">
      <Button type="submit">Convert to Mongo Query</Button>
    </div>
  </Textarea>
</form>

<br>
<P size="3xl">Mongo Query</P>
<Textarea id="textarea-id" placeholder="..." rows="4" bind:value={mongoText} readonly />
