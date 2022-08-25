#!/bin/bash
echo "#################################"
echo "Create a new Microfront (package)"
echo "#################################"


fd=0    #stdin
if [[ -t "$fd" || -p /dev/stdin ]]
then
    printf "\n\n"
    echo -n "New package name: "
    read -r name

    echo -n "Port number to run locally: "
    read -r port

    printf "\n\n"

    if [ -d packages/$name ]
    then
        echo "Package already exists."
        exit 1
    fi

    cp -r template packages/$name
    sed -i "s|<%= name %>|$name|" packages/$name/cloudbuild.yaml
    sed -i "s|<%= name %>|$name|" packages/$name/package.json
    sed -i "s|<%= port %>|$port|" packages/$name/package.json
    sed -i "s|<%= name %>|$name|" packages/$name/tsconfig.json
    sed -i "s|<%= name %>|$name|" packages/$name/webpack.config.js
    mv packages/$name/src/uma-template.tsx packages/$name/src/uma-$name.tsx
    rm packages/$name/create-new-package.sh

    PKG='jq'
    if [ $(dpkg-query -W -f='${Status}' $PKG 2>/dev/null | grep -c "ok installed") -eq 0 ];
    then
        sudo apt-get install -y $PKG;
    fi

    jKey="@uma/$name"
    jValue="https://microfront-portal-$name-#PROJECT_HASH#-uc.a.run.app/uma-$name.js"
    tmp=$(mktemp)
    jq --arg key "$jKey" --arg value $jValue '.imports += {($key): $value}' importmap.json > "$tmp" && mv "$tmp" importmap.json
else
    exit 1
fi

