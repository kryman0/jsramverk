<template>
    <div>
        <p>Reports for week {{ $route.params.id }}</p>
        <p>Link to github: <a target="_blank" href="https://github.com/kryman0/jsramverk">jsramverk</a></p>
        <p>{{ a }}</p>
    </div>
</template>

<script>
export default {
    data () {
        let a = 10;
        return {
            a: a,
        };
    },
};
</script>

<style>
</style>
