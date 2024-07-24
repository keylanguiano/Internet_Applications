const findPost = async (id) =>
{
    try
    {
        const res = await fetch (`https://jsonplaceholder.typicode.com/posts/${id}`)
        const post = await res.json ()

        console.log ('@ Keyla => Post ', post)
    }
    catch (err)
    {
        console.log ('@ Keyla => Error ', err)
    }
}

findPost (3)