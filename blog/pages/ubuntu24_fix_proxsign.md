# Ubuntu 24: how to use SETCCE proXSign with YubiKey

A few years ago I put my SIGEN-CA qualified digital certificate onto a YubiKey. This was a mistake.

I had it working on Ubuntu 20
- `sudo apt-get install libpcsclite1 pcscd pcsc-tools opensc-pkcs11`
- apt Firefox > settings > security devices > load "/usr/lib/x86_64-linux-gnu/opensc-pkcs11.so"
- Firefox > settings > certificates > import https://www.si-trust.gov.si/sl/podpora-uporabnikom/podpisovanje-s-komponento-proxsign/korensko-in-vmesna-potrdila
- proxsign deb, modules > add "/usr/lib/x86_64-linux-gnu/opensc-pkcs11.so"
- (it never worked in Chrome)

But

> Ubuntu's distributions, starting from version 22.04, have started packaging Firefox as a Snap package.

oh no.

Everything was working on Ubuntu 20 

https://proxsign.setcce.si/proXSignCustomerPages/installLinux.html
> SETCCE proXSign® for LINUX <br>
> We switched to AppImage! <br>
> Version: 2.2.13.38

oh no.

https://proxsign.setcce.si/proXSignCustomerPages/faq.html
> The SETCCE proXSign® component is officially supported on the following Linux distributions:
> - Ubuntu 23.04
> - Ubuntu 22.04 LTS
> - Fedora 38
> - Fedora 37
>
> SETCCE proXSign® AppImage works also on the following Linux distributions, which are NOT OFFICIALLY SUPPORTED, and we do not provide support for them: 
> - Ubuntu 20.04 LTS
> - Ubuntu 18.04 LTS
> - openSUSE 15.5
> - openSUSE 15.4
> - Debian 12
> - Debian 11

`cat /etc/os-release`
> PRETTY_NAME="Ubuntu 24.04.2 LTS"

Try opening https://edavki.durs.si/EdavkiPortal/PersonalPortal/Pages/Login/Login.aspx : it doesn't prompt me which certificate to use. <br>
Try running `SETCCE_proXSign-2.2.13.38-x86_64.appimage` : certificate list is empty. <br>
Try signing https://www.si-trust.gov.si/sl/podpora-uporabnikom/podpisovanje-s-komponento-proxsign/preizkus-podpisovanja-s-podpisno-komponento : certificate list is empty <br>

> Try opening https://edavki.durs.si/EdavkiPortal/PersonalPortal/Pages/Login/Login.aspx : it doesn't prompt me which certificate to use.

This indicates a Firefox + YubiKey issue. Ubuntu settings > apps (permissions) > firefox > enable pcscd. Now it does prompt, but I don't like it.

To make it work like it used to switch to apt Firefox:
https://askubuntu.com/questions/1399383/how-to-install-firefox-as-a-traditional-deb-package-without-snap-in-ubuntu-22
```sh
sudo add-apt-repository ppa:mozillateam/ppa
echo '
Package: *
Pin: release o=LP-PPA-mozillateam
Pin-Priority: 1001

Package: firefox
Pin: version 1:1snap*
Pin-Priority: -1
' | sudo tee /etc/apt/preferences.d/mozilla-firefox

sudo snap remove firefox
sudo apt install firefox
echo 'Unattended-Upgrade::Allowed-Origins:: "LP-PPA-mozillateam:${distro_codename}";' | sudo tee /etc/apt/apt.conf.d/51unattended-upgrades-firefox
```
- apt Firefox > settings > security devices > load "/usr/lib/x86_64-linux-gnu/opensc-pkcs11.so"
- Firefox > settings > certificates > import https://www.si-trust.gov.si/sl/podpora-uporabnikom/podpisovanje-s-komponento-proxsign/korensko-in-vmesna-potrdila

---

> Try running `SETCCE_proXSign-2.2.13.38-x86_64.appimage` : certificate list is empty.

AppImage never works. Try `--no-sandbox` like every other broken AppImage? Nope still broken.

/home/luka/.local/share/SETCCE/proXSign/logs/proxsign.log says
> Adding new pkcs#11 module .. opensc-pkcs11 (/usr/lib/x86_64-linux-gnu/opensc-pkcs11.so)
> Error loading pkcs#11 module: (code:-5977) /lib/x86_64-linux-gnu/libgio-2.0.so.0: undefined symbol: g_source_set_static_name

Try some chatgpt diagnosis suggestions
```sh
$ dpkg -l | grep libglib2.0-0
rc libglib2.0-0:amd64 2.72.4-0ubuntu2.5 amd64 GLib library of C routines
ii libglib2.0-0t64:amd64 2.80.0-6ubuntu3.4 amd64 GLib library of C routines

$ strings /lib/x86_64-linux-gnu/libgio-2.0.so.0 | grep g_source_set_static_name
g_source_set_static_name
$ nm -D /lib/x86_64-linux-gnu/libgio-2.0.so.0 | grep g_source_set_static_name
                 U g_source_set_static_name
$ LD_DEBUG=bindings opensc-tool 2>&1 | grep g_source_set_static_name
57741:	binding file /lib/x86_64-linux-gnu/libgio-2.0.so.0 [0] to /lib/x86_64-linux-gnu/libglib-2.0.so.0 [0]: normal symbol `g_source_set_static_name'

LD_DEBUG=libs ./SETCCE_proXSign-2.2.13.38-x86_64.AppImage  >aa 2>bb
58214:	find library=libglib-2.0.so.0 [0]; searching
58214:	 search path=/tmp/.mount_SETCCEVTXaWx/usr/bin/../lib		(RUNPATH from file /tmp/.mount_SETCCEVTXaWx/AppRun.wrapped)
58214:	  trying file=/tmp/.mount_SETCCEVTXaWx/usr/bin/../lib/libglib-2.0.so.0
```

meh. Then I extracted the AppImage and searched for "libglib", found, opened as text, and searched for "g_source_set_static_name", not found. That sounds like an issue. 

```sh
./SETCCE_proXSign-2.2.13.38-x86_64.AppImage --appimage-extract
rm SETCCE_proXSign-2.2.13.38-x86_64.AppImage
cd squashfs-root
mv usr/lib/libglib-2.0.so.0 usr/lib/libglib-2.0.so.0.bak
ln -s /lib/x86_64-linux-gnu/libglib-2.0.so.0 usr/lib/libglib-2.0.so.0
./AppRun
```

Certificate list shows sigen-ca cert :tada:

but it expires soon.. exciting.

https://www.si-trust.gov.si/sl/podpora-uporabnikom/podpisovanje-s-komponento-proxsign/preizkus-podpisovanja-s-podpisno-komponento
- sign works
- verify fails
- ignore that, it's fine 🤷‍♂️
