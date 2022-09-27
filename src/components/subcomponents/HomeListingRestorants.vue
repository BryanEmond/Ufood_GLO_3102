<template>
  <div>
    <div v-for="item in items" :key="item.id" class="mb-3">
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white inline"
      >
        {{ item.categorie }}
      </h5>
      <div class="float-right">
        <a href="#" class="mr-1">see all</a>
        <button
          class="bg-gray-400 bg-gray-400 text-white font-bold py-1 px-3 rounded-full text-black mr-1"
        >
          &lt;
        </button>
        <button
          class="bg-gray-400 bg-gray-400 text-white font-bold py-1 px-3 rounded-full text-black"
        >
          >
        </button>
      </div>

      <div class="overflow-hidden whitespace-nowrap">
        <a
          v-for="restorant in item.restorant"
          :key="restorant.id"
          href="#"
          class="inline-block w-96 p-3 m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <div class="w-full flex justify-center">
            <img v-bind:src="restorant.image" class="h-48" />
          </div>

          <h5
            class="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white inline"
          >
            {{ restorant.title }}
          </h5>
          <div class="float-right inline">
            <p class="font-normal text-gray-700 dark:text-gray-400 inline">{{restorant.rating}}</p>
            <img
              src="https://cdn3.iconfinder.com/data/icons/sympletts-free-sampler/128/star-512.png"
              class="h-5 inline pb-1"
            />
          </div>

          <div>
            <p class="font-normal text-gray-700 dark:text-gray-400 inline">
              {{ restorant.distance }} -
            </p>
            <p class="font-normal text-gray-700 dark:text-gray-400 inline">
              {{ restorant.time }} -
            </p>
            <p class="font-normal text-gray-700 dark:text-gray-400 inline">
              ${{ restorant.deliveryFee }}
            </p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script type="module">
export default {
  name: "Home",
  data() {
    return {
      items: [
        {
          id: 111,
          categorie: "Wallet Friendly",
          restorant: [
            {
              id: 123,
              title: "McDonald's",
              distance: "500 metres",
              time: "10 min",
              deliveryFee: 5,
              rating:5,
              image:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/McDonald%27s_logo.svg/220px-McDonald%27s_logo.svg.png",
            },
            {
              id: 444,
              title: "Tim horton",
              distance: "350 metres",
              time: "8 min",
              deliveryFee: 3,
              rating:4.5,
              image:
                "https://hillcrestmall.ca/wp-content/uploads/2021/09/67792b54112b993dc4579917d4f6b67310971243.png",
            },
            {
              id: 123,
              title: "St hubert",
              distance: "250 metres",
              time: "5 min",
              deliveryFee: 5,
              rating:3,
              image:
                "https://mma.prnewswire.com/media/1638087/St_Hubert_Group_Ltd__Cora_and_St_Hubert_join_forces_.jpg?p=facebook",
            },
            {
              id: 444,
              title: "KFC",
              distance: "700 metres",
              time: "154 min",
              deliveryFee: 3,
              rating: 1.5,
              image:
                "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png",
            },
          ],
        },
        {
          id: 222,
          categorie: "Fastest Near You",
          restorant: [
            {
              id: 123,
              title: "McDonald's",
              distance: "500 metres",
              time: "10 min",
              deliveryFee: 5,
              rating:5,
              image:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/McDonald%27s_logo.svg/220px-McDonald%27s_logo.svg.png",
            },
            {
              id: 444,
              title: "Tim horton",
              distance: "350 metres",
              time: "8 min",
              deliveryFee: 3,
              rating:4.5,
              image:
                "https://hillcrestmall.ca/wp-content/uploads/2021/09/67792b54112b993dc4579917d4f6b67310971243.png",
            },
            {
              id: 123,
              title: "St hubert",
              distance: "250 metres",
              time: "5 min",
              deliveryFee: 5,
              rating:3,
              image:
                "https://mma.prnewswire.com/media/1638087/St_Hubert_Group_Ltd__Cora_and_St_Hubert_join_forces_.jpg?p=facebook",
            },
            {
              id: 444,
              title: "KFC",
              distance: "700 metres",
              time: "154 min",
              deliveryFee: 3,
              rating: 1.5,
              image:
                "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png",
            },
          ],
        },
        {
          id: 222,
          categorie: "Quick and affordable Dinners",
          restorant: [
            {
              id: 123,
              title: "McDonald's",
              distance: "500 metres",
              time: "10 min",
              deliveryFee: 5,
              rating:5,
              image:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/McDonald%27s_logo.svg/220px-McDonald%27s_logo.svg.png",
            },
            {
              id: 444,
              title: "Tim horton",
              distance: "350 metres",
              time: "8 min",
              deliveryFee: 3,
              rating:4.5,
              image:
                "https://hillcrestmall.ca/wp-content/uploads/2021/09/67792b54112b993dc4579917d4f6b67310971243.png",
            },
            {
              id: 123,
              title: "St hubert",
              distance: "250 metres",
              time: "5 min",
              deliveryFee: 5,
              rating:3,
              image:
                "https://mma.prnewswire.com/media/1638087/St_Hubert_Group_Ltd__Cora_and_St_Hubert_join_forces_.jpg?p=facebook",
            },
            {
              id: 444,
              title: "KFC",
              distance: "700 metres",
              time: "154 min",
              deliveryFee: 3,
              rating: 1.5,
              image:
                "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png",
            },
          ],
        },
        {
          id: 222,
          categorie: "Try Something New",
          restorant: [
            {
              id: 123,
              title: "McDonald's",
              distance: "500 metres",
              time: "10 min",
              deliveryFee: 5,
              rating:5,
              image:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/McDonald%27s_logo.svg/220px-McDonald%27s_logo.svg.png",
            },
            {
              id: 444,
              title: "Tim horton",
              distance: "350 metres",
              time: "8 min",
              deliveryFee: 3,
              rating:4.5,
              image:
                "https://hillcrestmall.ca/wp-content/uploads/2021/09/67792b54112b993dc4579917d4f6b67310971243.png",
            },
            {
              id: 123,
              title: "St hubert",
              distance: "250 metres",
              time: "5 min",
              deliveryFee: 5,
              rating:3,
              image:
                "https://mma.prnewswire.com/media/1638087/St_Hubert_Group_Ltd__Cora_and_St_Hubert_join_forces_.jpg?p=facebook",
            },
            {
              id: 444,
              title: "KFC",
              distance: "700 metres",
              time: "154 min",
              deliveryFee: 3,
              rating: 1.5,
              image:
                "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png",
            },
          ],
        },
        {
          id: 222,
          categorie: "National Favourite",
          restorant: [
            {
              id: 123,
              title: "McDonald's",
              distance: "500 metres",
              time: "10 min",
              deliveryFee: 5,
              rating:5,
              image:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/McDonald%27s_logo.svg/220px-McDonald%27s_logo.svg.png",
            },
            {
              id: 444,
              title: "Tim horton",
              distance: "350 metres",
              time: "8 min",
              deliveryFee: 3,
              rating:4.5,
              image:
                "https://hillcrestmall.ca/wp-content/uploads/2021/09/67792b54112b993dc4579917d4f6b67310971243.png",
            },
            {
              id: 123,
              title: "St hubert",
              distance: "250 metres",
              time: "5 min",
              deliveryFee: 5,
              rating:3,
              image:
                "https://mma.prnewswire.com/media/1638087/St_Hubert_Group_Ltd__Cora_and_St_Hubert_join_forces_.jpg?p=facebook",
            },
            {
              id: 444,
              title: "KFC",
              distance: "700 metres",
              time: "154 min",
              deliveryFee: 3,
              rating: 1.5,
              image:
                "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png",
            },
          ],
        },
        {
          id: 222,
          categorie: "Most-Loved Restorants",
          restorant: [
            {
              id: 123,
              title: "McDonald's",
              distance: "500 metres",
              time: "10 min",
              deliveryFee: 5,
              rating:5,
              image:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/McDonald%27s_logo.svg/220px-McDonald%27s_logo.svg.png",
            },
            {
              id: 444,
              title: "Tim horton",
              distance: "350 metres",
              time: "8 min",
              deliveryFee: 3,
              rating:4.5,
              image:
                "https://hillcrestmall.ca/wp-content/uploads/2021/09/67792b54112b993dc4579917d4f6b67310971243.png",
            },
            {
              id: 123,
              title: "St hubert",
              distance: "250 metres",
              time: "5 min",
              deliveryFee: 5,
              rating:3,
              image:
                "https://mma.prnewswire.com/media/1638087/St_Hubert_Group_Ltd__Cora_and_St_Hubert_join_forces_.jpg?p=facebook",
            },
            {
              id: 444,
              title: "KFC",
              distance: "700 metres",
              time: "154 min",
              deliveryFee: 3,
              rating: 1.5,
              image:
                "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png",
            },
          ],
        },
      ],
    };
  },
};
</script>
<style></style>
