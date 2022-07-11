<template>
    <v-col
        cols="12"
        lg="2"
        md="4"
        sm="6"
        xs="12"
    >
        <v-card :class="$style.card">
            <v-img 
                :class="$style.image"
                contain
                :src="require(`~/assets${variant ? variant.product.image : product.image}`)"
                :alt="product.title"
            />
            <v-card-title>
                <div>
                    <div class="title">
                        {{product.regular_price | formatPrice}}
                    </div>
                    <span class="title blue--text">{{product.title}}</span>
                </div>
            </v-card-title>
            <v-card-subtitle>
                {{brandTitle}}
            </v-card-subtitle>
            <v-card-text v-if="product.configurable_options">
                <div
                    :class="$style.options"
                    v-for="option in product.configurable_options"
                    :key="option.attribute_id"

                >
                    <ShowcaseProductcardAttribute
                        v-for="value in option.values"
                        :key="value.value_index"
                        :value="value"
                        :attribute_code="option.attribute_code"
                        :disabledAttributes="disabledAttributes"
                        :activeAttributes="activeAttributes"
                        @click="clickAttribute"
                    />
                </div>
            </v-card-text>
            <v-card-actions :class="$style.cardActions">
                <v-btn outlined color="blue" @click="clickBuy" :disabled="product.configurable_options && !variant">Buy</v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>

/**
 * checks variant for the presence of an attribute
 * @param {object<{attributes: array}>} variant
 * @param {any} code
 * @param {any} value_index
 * @returns {boolean}
 */
function variantHasAttribute(variant, code, value_index) {
    return Boolean(variant.attributes.find(attr => code === attr.code && value_index === attr.value_index));
}
export default {
    name: "Productcard",
    props: {
        product: {type: Object, required: true},
    },
    data() {
        return {
            variant: undefined,
            activeAttributes: [],
            disabledAttributes: []
        }
    },
    computed: {
        brandTitle() {
            const brand = this.$store.state.brands.data.find((brand) => brand.id === this.product.brand);
            return brand ? brand.title : "";
        }
    },
    methods: {
        clickBuy() {
            if (this.product.type === "configurable" && !this.variant) {
                return;
            }
            this.$store.commit("cart/addProduct", {
                productId: this.product.id,
                variantId: this.variant ? this.variant.product.id : undefined
            })
        },
        clickAttribute(attr) {
            const index = this.activeAttributes.findIndex(({code}) => code === attr.code)
            if (index >= 0) {
                if (this.activeAttributes[index].value_index === attr.value_index) {
                    this.activeAttributes.splice(index, 1);
                } else {
                    this.activeAttributes.splice(index, 1, attr);
                }
            } else {
                this.activeAttributes.push(attr)
            }
            
            //searching current Variant if all options are selected
            this.variant = this.product.variants.find(variant => 
                variant.attributes.length === this.activeAttributes.length
                && variant.attributes.every(attr => 
                    this.activeAttributes.find(({code, value_index }) =>
                        code === attr.code && value_index === attr.value_index
                    )
                )
            )

            this.disabledAttributes = [];
            //searching attributes for disable
            this.activeAttributes.forEach((attr) => {
                const availableVariants = this.product.variants
                    .filter(variant => variantHasAttribute(variant, attr.code, attr.value_index));


                this.product.configurable_options
                    .forEach(option => {
                        if (attr.code !== option.attribute_code) {
                            option.values.forEach(({value_index}) => {
                                const hasAvailableVariant = Boolean(availableVariants
                                    .find(variant => variantHasAttribute(variant, option.attribute_code, value_index))
                                );
                                if (!hasAvailableVariant) {
                                    this.disabledAttributes.push({
                                        code: option.attribute_code,
                                        value_index
                                    });
                                }
                            })
                        }
                    })
            })
        }
    }
}
</script>
<style lang="css" module>
.card{
    height: 100%;
    display: flex;
    flex-direction: column;
}
.cardActions{
    flex-grow: 2;
    align-items: flex-end;
}
.image {
    max-height: 223px;
}
.options {
  display: flex;
  gap: 3px;
  flex-direction: row;
  margin-bottom: 3px;
}
</style>