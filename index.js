let pubKey = "";
let encrypted = "";
let privateKey = "";

initialize();

document.querySelector('#decrypted').addEventListener('keyup', textbox => encrypt(textbox.target.value));

document.querySelector('#encrypted').addEventListener('keyup', textbox => {
    const value = textbox.target.value;
});

async function initialize() {
    let pubkeyArmored = "";
    await fetch('pubkey').then(response => response.text()).then(data => pubkeyArmored = data);

    pubKey = await openpgp.readKey({ armoredKey: pubkeyArmored });
}


async function encrypt(value) {
    encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: value }),
        encryptionKeys: pubKey,
    });

    document.querySelector('#encrypted').value = encrypted;
}