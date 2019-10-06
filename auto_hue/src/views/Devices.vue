<template>
  <div class="devices">
    <h1>Devices</h1>
    <Carousel :navigationEnabled="true" :perPageCustom="[[480, 2], [768, 3]]">
      <Slide>
        Slide 1
      </Slide>
      <Slide>
        Slide 2
      </Slide>
      <Slide>
        Slide 3
      </Slide>
      <Slide>
        Slide 4
      </Slide>
      <Slide>
        Slide 5
      </Slide>
      <Slide>
        Slide 6
      </Slide>
    </Carousel>
    <h1>Groups</h1>
    <Carousel :perPageCustom="[[480, 2], [768, 3]]">
      <Slide>
        Slide 1
      </Slide>
      <Slide>
        Slide 2
      </Slide>
      <Slide>
        Slide 3
      </Slide>
      <Slide>
        Slide 4
      </Slide>
      <Slide>
        Slide 5
      </Slide>
      <Slide>
        Slide 6
      </Slide>
    </Carousel>
  </div>
</template>

<script>

import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'Devices',
  components: {
    Carousel, Slide,
  }
}
</script>
