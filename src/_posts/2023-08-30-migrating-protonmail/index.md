---
title: "Migrateing from Protonmail to Mailbox.org"
date: 2023-08-30
background: white
snippet: This post will show you how I migrated my Mails from Protonmail to Mailbox.org.
tags: ["Proton", "Protonmail", "Mailbox", "Mailbox.org", "GPG", "Encryption"]
---

# TL;DR

Check [https://github.com/Nickwasused/eml-encrypt](https://github.com/Nickwasused/eml-encrypt)

# The Reason

Everything stated when I wanted to split everything that Proton offers up to different services, as they offer Mail, VPN, Anonymous Mail (Simplelogin), Drive and a Calendar. I just did not want everything to be on the same service. So I started to search alternatives and ended up with Mailbox.org. (I am still using Simplelogin for now.)

# The Problem

When using Protonmail everything gets encrypted using "zero-access encryption" [1]. But on Mailbox.org that is different. I have to set up the keys and when I do that a sieve filter gets created that does the encryption [2, The technology]. But this will not add encryption to the mails that I already have.

## Export/Import

Exporting from Protonmail is very simple: use the Import-Export app [3]. I exported the Mails in the .eml format. That gives me a file for every Mail.
But, as stated above, the .eml files are decrypted Mails. So when I import them to Mailbox.org, and they bypass the sieve filter, everything will be readable server-side.

Re encrypting Emails is something that is probably not done often, as I couldn't find much about it online.

What I mean about re-encrypting is that the .eml Message body gets encrypted and the necessary headers added.

Here is an example .eml file:

```
Mime-Version: 1.0
From: "Example" <example@example.com>
To: "Nick" <nick@example.com>
Reply-To: "example" <example@example.com>
Date: 1 Mar 2023 13:00:00 +0000
Subject: example
Content-Type: multipart/mixed;boundary=---------------------593aa3cf8475332b9edd3f4e90b930ab
Message-Id: someid

-----------------------593aa3cf8475332b9edd3f4e90b930ab
Content-Type: multipart/related;boundary=---------------------6cfea369c028af27f1e27a9a80649089

-----------------------6cfea369c028af27f1e27a9a80649089
Content-Type: text/html;charset=utf-8
Content-Transfer-Encoding: base64

(Base64 code)
-----------------------593aa3cf8475332b9edd3f4e90b930ab--
```

But I want the email to look like the following:
```
From example@example.com  Wed Aug 30 10:58:50 2023
Mime-Version: 1.0
From: "Example" <example@example.com>
To: "Nick" <nick@example.com>
Reply-To: "example" <example@example.com>
Date: 1 Mar 2023 13:00:00 +0000
Subject: example
Message-Id: someid
Content-Type: multipart/encrypted; protocol="application/pgp-encrypted";boundary="MfFXiAuoTsnnDAfX"

--MfFXiAuoTsnnDAfX
Content-Type: application/pgp-encrypted
Content-Description: PGP/MIME version identification
MIME-Version: 1.0
Content-Transfer-Encoding: 7bit

Version: 1

--MfFXiAuoTsnnDAfX
Content-Type: application/octet-stream; name="encrypted.asc"
Content-Description: OpenPGP encrypted message
Content-Disposition: inline; filename="encrypted.asc"

-----BEGIN PGP MESSAGE-----

hF4D6vZ1iXE7EVcSAQdA8imCSEyH9Ql6cir/UYV9xbnSNYOYrdEjH1FCsJXZc0gw
AnKMyPvsrXQudsufn4W63ukrUr1Yee6VwPZ6Fm/FzYNiuKBslqw5nqLz7Qu0/dM0
0sA+AaNTkmplFH6gPi0YGZ2zHGNnlMR6OKnEx9en6qM4qDFekZxpq2Mm8OelQnoa
mv+169IrZwX3StWjLBeb+cSbWIrdUtlu/S6RYiEqrmoYSjoCB9mkLWIUiMegLqFo
ls2oBNk/Em/JYwNc2S16rdOvlHAf8thFYmoCex2joSwenDxc5XrNH2s/44S6+2EX
4i3R3T4q4c57G2JP3/NmeTGCw7RgkruFL4p+uCXv+OoCTc8kkJW6CZvtFi7RXJPM
f0uLM05qj1LR1vTuON6rMshfy/kHYSMfCSXK+Equm//6BHIB6zIsLDk2ddP/Lwsc
8/PiypmEKJ0zrSzCFwEa8uI=
=Jg4+
-----END PGP MESSAGE-----

--MfFXiAuoTsnnDAfX--
```

# Search for the fix

While searching for a program that could help me, I found this: [https://github.com/ansemjo/imap-reencrypt](https://github.com/ansemjo/imap-reencrypt)

I thought that I could modify the code for my specific use case. (It did not work, rip 8 hours lifetime.)

Then I found [https://github.com/jnphilipp/gpgmail](https://github.com/jnphilipp/gpgmail) and tried to modify the code again, and it worked!

But in reality it did not. K-9 Mail couldn't decrypt the file. Well, another 4 hours gone.

# The Answer

Then I finally found the answer: https://superuser.com/a/1243082. While it did not work right away, with some small modifications it was working.

The code is here: [https://github.com/Nickwasused/eml-encrypt](https://github.com/Nickwasused/eml-encrypt)

All I had to do was running the script, and I'd be done. Thunderbird and K-9 can decrypt the Mails with attachments.

Instructions to run the code are in the Github repo.


# source

[1] [https://proton.me/support/proton-mail-encryption-explained](https://proton.me/support/proton-mail-encryption-explained)  
[2] [https://kb.mailbox.org/en/private/e-mail-article/your-encrypted-mailbox](https://kb.mailbox.org/en/private/e-mail-article/your-encrypted-mailbox)  
[3] [https://proton.me/support/export-emails-import-export-app](https://proton.me/support/export-emails-import-export-app)
