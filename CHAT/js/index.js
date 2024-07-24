const acceder = document.getElementById ('acceder')
const salir = document.getElementById ('salir')
const formulario = document.getElementById ('formulario')
const templateChat = document.getElementById ('template_chat').content
const chat = document.getElementById ('chat')
const btnEnviar = document.getElementById ('btn_enviar')
const mensajeLogOut = document.getElementById ('mensaje_log_out')

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, onSnapshot, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDRyaTTnnSHKQ2CPAnJhZZ29BpOUPbSpM",
    authDomain: "chat-firebase-e5eb5.firebaseapp.com",
    projectId: "chat-firebase-e5eb5",
    storageBucket: "chat-firebase-e5eb5.appspot.com",
    messagingSenderId: "695079393947",
    appId: "1:695079393947:web:207af9f0067247f660843e"
};

// Initialize Firebase
const app = initializeApp (firebaseConfig);
const auth = getAuth (app)
const db = getFirestore (app)

const mostrar_elemento = elemento => 
{
    elemento.classList.remove ('d-none')
}

const ocultar_elemento = elemento => 
{
    elemento.classList.add ('d-none')
}

let unsuscribe

onAuthStateChanged (auth, (user) =>
{
    if (user)
    {
        console.log ('user', user)

        mostrar_elemento (chat)
        mostrar_elemento (formulario)
        mostrar_elemento (salir)
        ocultar_elemento (acceder)
        ocultar_elemento (mensajeLogOut)

        chat.innerHTML = ''

        const q = query (collection (db, 'chat'), orderBy ('fecha'))

        console.log ('const q', q)

        console.log ('uns', unsuscribe)

        unsuscribe = onSnapshot (q, (snapshot) =>
        {
            console.log ('unsuscribe', unsuscribe)

            snapshot.docChanges ().forEach( (change) => 
            {
                console.log ('type', change.type)

                if (change.type === 'added')
                {
                    console.log ('type', change.type)
                    dibujarChat (change.doc.data())
                }

                chat.scrollTop = chat.scrollHeight
            })
        })
    }
    else
    {
        ocultar_elemento (chat)
        ocultar_elemento (formulario)
        ocultar_elemento (salir)
        mostrar_elemento (acceder)
        mostrar_elemento (mensajeLogOut)

    if (unsuscribe)
    {
        unsuscribe ()

        console.log ('unsuscribe')
    }
    }
})

acceder.addEventListener ('click', async () =>
{
    try
    {
        const provider = new GoogleAuthProvider ()
        await signInWithPopup (auth, provider)

        console.log ('@ Keyla => acceso correcto ')
    }
    catch (err)
    {
        console.log ('@ Keyla => error ', err)
    }
})

salir.addEventListener ('click', async () =>
{
    try
    {
        await signOut (auth)
    }
    catch (err)
    {
        console.log ('@ Keyla => error ', err)
    }
})

formulario.addEventListener ('submit', async (e) =>
{
    e.preventDefault ()

    if (!formulario.msg.value.trim ())
    {
        formulario.msg.focus ()
        formulario.msg.value = ''
        return
    }

    try
    {
        btnEnviar.disable = true

        const mensaje = await addDoc (collection (db, 'chat'), 
        {
            msg: formulario.msg.value.trim (),
            fecha: Date.now (),
            uid: auth.currentUser.uid
        })
        console.log(mensaje)
        formulario.msg.value = ''
    }
    catch (err)
    {
        console.log ('@Keyla => error ', err)
    }
    finally
    {
        btnEnviar.disable = false
    }
})

const dibujarChat = ({msg, uid}) =>
{
    const clone = templateChat.cloneNode (true)
    console.log ('msg', msg)
    if (uid === auth.currentUser.uid)
    {
        clone.querySelector ('div').classList.add ('text-end')
        clone.querySelector ('span').classList.add ('bd-success')
        clone.querySelector ('.mio').textContent = msg
    }
    else
    {
        clone.querySelector ('div').classList.add ('text-start')
        clone.querySelector ('span').classList.add ('bd-secondary')
        clone.querySelector ('.otro').textContent = msg
    }
    chat.appendChild (clone)
}