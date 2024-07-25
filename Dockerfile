FROM mysql:8.0.33

ENV MYSQL_ROOT_PASSWORD=secure_password
ENV MYSQL_DATABASE=sinapsis_technical_test

COPY ./db_scripts/ /docker-entrypoint-initdb.d/