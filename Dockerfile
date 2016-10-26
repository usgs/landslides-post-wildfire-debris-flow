## Docker file to build app as container

FROM debian:jessie
MAINTAINER "Jeremy Fee" <jmfee@usgs.gov>
LABEL dockerfile_version="v0.1.0"


# install dependencies
RUN apt-key update -y \
    && apt-get update -y \
    && apt-get install -y \
        bzip2 \
        curl \
        git \
        php5-cgi \
        php5-curl \
    && curl -o- \
        https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh \
        | /bin/bash \
    && /bin/bash --login -c " \
        nvm install 4.2.4 \
        && npm install -g grunt-cli"

# copy application (ignores set in .dockerignore)
COPY . /hazdev-project

# configure application
RUN /bin/bash --login -c " \
    cd /hazdev-project \
    && npm install \
    && php ./src/lib/pre-install.php --non-interactive \
    && grunt builddist \
    && rm -r \
        /hazdev-project/node_modules/grunt-mocha-phantomjs \
        /root/.npm \
        /tmp/npm* \
    "


WORKDIR /hazdev-project
EXPOSE 8881
CMD /bin/bash --login -c "grunt rundist"
