# WebCatalog

[![Join the chat at https://gitter.im/webcatalog/webcatalog](https://badges.gitter.im/webcatalog/webcatalog.svg)](https://gitter.im/webcatalog/webcatalog?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Travis Build Status](https://travis-ci.org/webcatalog/webcatalog.svg?branch=master)](https://travis-ci.org/webcatalog/webcatalog)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/webcatalog/webcatalog?branch=master&svg=true)](https://ci.appveyor.com/project/webcatalog/webcatalog/branch/master)
[![MIT License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/webcatalog/webcatalog/blob/master/LICENSE)
[![Donate with Paypal](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=JZ2Y4F47ZMGHE&lc=US&item_name=WebCatalog&item_number=webcatalog&currency_code=USD)

#### Homepage: https://getwebcatalog.com

## Introduction
WebCatalog is a desktop app which allows users to install and run web apps natively. It offers similar functionalities with [Fluid](http://fluidapp.com/) and [Nativefier](https://github.com/jiahaog/nativefier) but with different approach and a more user-friendly UI.

WebCatalog Desktop needs to rely on [WebCatalog Backend](https://github.com/webcatalog/backend) to store data and manage app updates.

## Development
With Node.js 6+ & Yarn installed, run

```bash
git clone https://github.com/webcatalog/webcatalog.git
cd desktop
yarn
```

To run the app for development:
```bash
yarn dev
yarn start
```

To build the app for release:
```bash
yarn dist
```
