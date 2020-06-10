<template>
    <div>
        <p>Reports for week {{ $route.params.id }}</p>
        <p>Link to github: <a target="_blank" href="https://github.com/kryman0/jsramverk">jsramverk</a></p>
        <p><span v-html="readme"></span></p>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            readme: null,
        };
    },
    created: function () {
        this.readme = this.getReadme();
    },
    methods: {
        getReadme() {
            let readme =
`
# Installation
<br />
<br />
## Prerequisites
<br />
<br />
Make sure to have npm and node (version ^14, could work on a lower version also) installed.
<br />
<br />
## Setup
<br />
<br />
Clone the repository with *git clone git@github.com:kryman0/jsramverk.git*. With the repo comes a pre-configured package.json file. To install the Vue JavaScript framework, and other components and necessary dependencies just run *npm install* in the root folder (where package.json is located).
<br />
<br />
Start the application by browsing the dist/index.html file.
`;
            return readme;
        },
    },
};
</script>

<style>
</style>
