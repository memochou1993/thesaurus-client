<template>
  <div>
    <q-card-section>
      <div
        class="q-py-sm text-subtitle1"
      >
        Parent Subjects:
      </div>
      <div
        class="q-px-md"
      >
        <q-tree
          :nodes="parentSubjects"
          :selected.sync="selectedSubjectId"
          selected-color="primary"
          node-key="subjectId"
          @lazy-load="loadChildSubjects"
          @update:selected="selectSubject()"
        >
          <template
            v-slot:default-header="prop"
          >
            <div
              v-html="o(a(prop.node.subject.term.preferredTerms)[0]).termText"
            />
          </template>
        </q-tree>
      </div>
    </q-card-section>
  </div>
</template>

<script>
import {
  mapState,
  mapActions,
} from 'vuex';
import parser from '../mixins/parser';

export default {
  mixins: [
    parser,
  ],
  data() {
    return {
      parentSubjects: [],
      selectedSubjectId: null,
    };
  },
  computed: {
    ...mapState([
      'subject',
    ]),
    parents() {
      return [
        ...this.a(this.o(this.subject.parentRelationship).preferredParents),
        ...this.a(this.o(this.subject.parentRelationship).nonPreferredParents),
      ];
    },
  },
  created() {
    this.initialize();
  },
  watch: {
    selectedSubjectId(value) {
      if (!value) {
        this.setSelectedSubjectId(this.subject.subjectId);
      }
    },
  },
  methods: {
    ...mapActions([
      'fetchSubject',
      'fetchSubjects',
    ]),
    setParentSubjects(parentSubjects) {
      this.parentSubjects = parentSubjects;
    },
    setSelectedSubjectId(selectedSubjectId) {
      this.selectedSubjectId = selectedSubjectId;
    },
    initialize() {
      this.setSelectedSubjectId(this.subject.subjectId);
      if (!this.parents.length) {
        this.setParentSubjects([
          {
            subject: this.subject,
            subjectId: this.subject.subjectId,
            lazy: true,
          },
        ]);
        return;
      }
      this.findParentSubjects();
    },
    findParentSubjects() {
      this.parents.forEach((parent) => {
        this.fetchSubject({
          props: {
            subjectId: parent.parentSubjectId,
          },
        })
          .then(({ data }) => {
            this.setParentSubjects([
              ...this.parentSubjects,
              {
                subject: data,
                subjectId: data.subjectId,
                lazy: true,
              },
            ]);
          });
      });
    },
    loadChildSubjects({
      node,
      done,
    }) {
      this.fetchSubjects({
        params: {
          parentSubjectId: node.subjectId,
        },
      })
        .then(({ data }) => {
          if (!data) {
            return done([]);
          }
          const subjects = data.map((subject) => {
            const lazy = subject.subjectId === this.subject.subjectId;
            return {
              subject,
              subjectId: subject.subjectId,
              lazy,
            };
          });
          return done(subjects);
        });
    },
    selectSubject() {
      if (!this.selectedSubjectId) {
        return;
      }
      if (this.selectedSubjectId === this.$route.params.subjectId) {
        return;
      }
      this.$router.push({
        name: 'show',
        params: {
          subjectId: this.selectedSubjectId,
        },
      });
    },
  },
};
</script>
