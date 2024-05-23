#!/bin/sh

env_var() {
    # Look for a file named by $1_FILE and read the contents into $1
    local var_name=\$"$1"
    local var_file_name=$(eval "expr \"${var_name}_FILE\" ")
    if [ -n "$var_file_name" ] && [ -f "${var_file_name}" ]
    then
        local file_value=`cat ${var_file_name}`
        export "$1"="${file_value}"
    fi
}

env_var BACKLOG_REPORT_URL

if [[ ${BACKLOG_REPORT_URL} ]]; then
    ROOT_DIR=/usr/share/nginx/html
    for file in $ROOT_DIR/assets/*.js* $ROOT_DIR/index.html $ROOT_DIR/precache-manifest*.js;
    do
      sed -i 's|VITE_BACKLOG_REPORT_URL_PLACEHOLDER|'${BACKLOG_REPORT_URL}'|g' $file
    done
fi


exec "$@"
