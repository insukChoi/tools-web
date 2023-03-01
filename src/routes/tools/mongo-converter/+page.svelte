<script lang="ts">
    import { Textarea, P, Button, Alert } from 'flowbite-svelte'

    let mongoText = null;

    async function handleSubmit(event: Event) {
      const form = event.target as HTMLFormElement
      const data = new FormData(form)

      const res = await fetch("/api/convertToMongo", {
        method: "POST",
        body: data,
      })

      if (res) {
        const { mongoQuery } = await res.json()
        mongoText = JSON.stringify(mongoQuery, null, 4)
      }
    }
</script>
<br>
<Alert dismissable>
  <span slot="icon"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
  </span>
  <span class="font-medium">쿼리 맨 끝에 ; 세미콜론 넣으면 안됩니다.</span>
</Alert>
<P size="3xl">Mysql Query</P>
<form on:submit|preventDefault={handleSubmit}>
  <Textarea class="mb-4" placeholder="Write a MySQL Query" name="mysqlText" rows="10">
    <div slot="footer" class="flex items-center justify-between">
      <Button type="submit">Convert to Mongo Query</Button>
    </div>
  </Textarea>
</form>

<br>
<P size="3xl">Mongo Query</P>
<Textarea id="textarea-id" placeholder="..." rows="20" bind:value={mongoText} readonly />
