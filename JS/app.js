const post = [
    { userId: 1, id: 1, title: 'Post 1', body: 'Post 1 : bla bla bla ...' },
    { userId: 2, id: 2, title: 'Post 2', body: 'Post 2 : bla bla bla ...' },
    { userId: 3, id: 3, title: 'Post 3', body: 'Post 3 : bla bla bla ...' },
    { userId: 4, id: 4, title: 'Post 4', body: 'Post 4 : bla bla bla ...' },
    { userId: 5, id: 5, title: 'Post 5', body: 'Post 5 : bla bla bla ...' }
]

const findById = (id, callback) =>
{
    const result = post.find ((item) => item.id === id)
    
    if (result)
    {
        callback (null, result)
    }
    else
    {
        callback ('El post ' + id + ' no fue encontrado')
    }
    
}

findById (3, (err, result) =>
{
    if (err)
    {
        return console.log ('@ Keyla => Find By Id Error ', err)
    }
    console.log ('@ Keyla => Find By Id Post ', result)
})

findByIdPromise = (id) =>
{
    const result = post.find ((item) => item.id === id)
    
    return new Promise ((resolve, reject) => 
    {
    
        if (result)
        {
            resolve (result)
        }
        else
        {
            reject ('@ Keyla => Find By Id Promise Con promesa tampoco se encontro el post ' + id)
        }
        })
}

findByIdPromise (3)
    .then ((item) => console.log ('@ Keyla => Find By Id Promise Post ', item))
    .catch ((err) => console.log ('@ Keyla => Find By Id Promise Error ', err))
    .finally (() => console.log ('@ Keyla => Find By Id Promise Fin de la promesa '))

findByIdAsync = (id) =>
{   
    return new Promise ((resolve, reject) => 
    {
        setTimeout (() => 
        {
            const result = post.find ((item) => item.id === id)

            result ? resolve (result) : reject ('@ Keyla => Find By Id Promise Reject Post ', id)
        }, 5000)
    })
}

const finder =  async () =>
{
    const posts = await Promise.all 
    ([
        findByIdAsync (3),
        findByIdAsync (2),
        findByIdAsync (5)
    ])

    posts.forEach((item) =>
    {
        console.log (' Keyla => Finder Title ', item.title)
    })
}

finder ()