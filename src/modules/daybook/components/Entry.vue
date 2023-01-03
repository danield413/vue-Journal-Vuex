<template>
    <div class="entry-container mb-3 pointer p-2" @click="$router.push({ name: 'entry', params: { id: 10 } })">
        <!-- Titulo -->
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">15</span>
            <span class="mx-1 fs-5">Julio</span>
            <span class="mx-2 fw-light">2023, Martes</span>
        </div>

        <div class="entry-description">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam ipsa qui est debitis voluptas aperiam veniam porro facilis. Est maiores ex autem quibusdam, delectus eum vero voluptate deserunt. Mollitia, voluptatum?
        </div>
    </div>
</template>

<script>
export default  {

}
</script>

<style lang="scss" scoped>
    .entry-container {
        border-bottom: 1px solid #2c3e50;
        transition: 0.2s all ease-in;

        &:hover {
            background-color: lighten(gray, $amount: 45);
        }
    }

    .entry-description {
        font-size: 12px;
    }
</style>