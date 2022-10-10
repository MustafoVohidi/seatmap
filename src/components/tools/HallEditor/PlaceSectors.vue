<template>
    <div class="palce-sector-content">
        <h3 class="title-content">Атрибуты места</h3>
        <div class="row">
            <div class="col-12 mb-10">
                <div class="input-group">
                    <label for="rows-1">Ряд:</label>
                    <div class="btn-input">
                        <input type="text" id="rows-1" />
                        <button>+</button>
                    </div>

                </div>
            </div>
            <div class="col-12 mb-10">
                <div class="input-group">
                    <label for="place-1">Место:</label>
                    <div class="btn-input">
                        <input type="text" id="place-1" />
                        <button>+</button>
                    </div>

                </div>
            </div>
            <div class="col-12 mb-10">
                <div class="input-group">
                    <label for="sector-1">Сектор:</label>
                    <div class="btn-input">
                        <select name="sector-1" id="sector-1">
                            <option value="0">1 ярус</option>
                            <option value="1">2</option>
                        </select>
                        <button>+</button>
                        <button>+</button>
                    </div>

                </div>
            </div>
            <div class="col-12 mb-10">
                <div class="input-group">
                    <label for="drop-1">Подъезд:</label>
                    <div class="btn-input">
                        <select name="drop-1" id="drop-1">
                            <option value="0">1 ярус</option>
                            <option value="1">2</option>
                        </select>
                        <button>+</button>
                        <button>+</button>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="position-block">
                    <div class="input-group  mb-10">
                        <label for="left-1">Слева:</label>
                        <input type="number" id="left-1" />
                    </div>
                    <div class="input-group  mb-10">
                        <label for="top-1">Сверху:</label>
                        <input type="number" id="top-1" />
                    </div>
                </div>
            </div>

        </div>
        <div class="row mb-10">
            <div class="col-12">
                <div class="input-group">
                    <label for="rotate-1">Слева:</label>
                    <input type="number" id="rotate-1" />
                </div>
            </div>
            <div class="col-12">
                <div class="input-group">
                    <input type="range" id="rotate-rang-1" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss">
 
</style>