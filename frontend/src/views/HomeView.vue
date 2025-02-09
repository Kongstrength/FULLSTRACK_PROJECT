<template>
  <div class="q-pa-md">
    <div class>
      <q-btn icon="add" @click="onCreate" />
    </div>
    <q-table title="Treats" :rows="rows" :columns="columns" row-key="name">
      <!-- Slot for custom actions in the table body -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <!-- Edit button -->
          <q-btn
            flat
            dense
            round
            icon="edit"
            @click="onEdit(props.row.customer_id)"
          />
          <!-- Delete button -->
          <q-btn
            flat
            dense
            round
            icon="delete"
            @click="onDelete(props.row.customer_id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import router from "../router";

// Define table columns
const columns = [
  {
    name: "customer_id",
    align: "center",
    label: "Customer ID",
    field: "customer_id",
    sortable: true,
  },
  {
    name: "first_name",
    align: "center",
    label: "First Name",
    field: "first_name",
    sortable: true,
  },
  {
    name: "last_name",
    align: "center",
    label: "Last Name",
    field: "last_name",
    sortable: true,
  },
  {
    name: "email",
    align: "center",
    label: "Email",
    field: "email",
    sortable: true,
  },
  {
    name: "address",
    align: "center",
    label: "Address",
    field: "address",
    sortable: true,
  },
  {
    name: "phone_number",
    align: "center",
    label: "Phone Number",
    field: "phone_number",
    sortable: true,
  },
  { name: "actions", align: "center", label: "Actions", field: "actions" },
];

// Reactive variable to store table rows
const rows = ref([]);

// Fetch data from API
const fetchData = async () => {
  fetch("http://localhost:8800/api/v1/customers")
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      rows.value = result;
    });
};

// Call fetchData to load data when component is created
fetchData();

// Navigate to the update page with the given customer ID
const onEdit = (id) => {
  router.push("Update/" + id);
  console.log(id);
};
const onCreate = () => {
  router.push("/create");
};

// Handle delete action for the given customer ID
const onDelete = (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`http://localhost:8800/api/v1/Customers/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      alert(result.message);
      console.log(result);
      if(result.success === 'ok'){
        router.push('/');
      }
      fetchData();
    })
    .catch((error) => console.error(error));
};
</script>
