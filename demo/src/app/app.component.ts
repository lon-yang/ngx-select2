import { Component } from '@angular/core';

@Component({
  selector: 'ngx-select2-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  selected: any;
  data: Array<any>;
  options: any = {
    multiple: true
  };

  selected2: any;
  data2: Array<any>;

  selected3: any;
  remoteOptions: any;

  ngOnInit() {
    this.data = [
      { text: 'Male', id: '5fe2555b-f201-4165-8845-115039221463' },
      { text: 'FeMale', id: 'ca22406c-350a-49e5-b0db-2714b164c560' }
    ];

    this.selected = [{ text: 'FeMale', id: 'ca22406c-350a-49e5-b0db-2714b164c560' }];

    let tempData = [];
    for (let i = 0; i < 5; i++) {
      tempData.push(`A_${i}`);
    }
    this.data2 = tempData;

    this.remoteOptions = {
      multiple: false,
      minimumInputLength: 1,
      ajax: {
        url: "https://api.github.com/search/repositories",
        dataType: 'json',
        delay: 250,
        data: function (params) {
          return {
            q: params.term,
            page: params.page
          };
        },
        processResults: function (data, params) {
          params.page = params.page || 1;

          return {
            results: data.items,
            pagination: {
              more: (params.page * 30) < data.total_count
            }
          };
        },
        cache: true
      },
      escapeMarkup: function (markup) { return markup; },
      templateResult: this.formatRepo,
      templateSelection: this.formatRepoSelection
    }
  }

  selectMale() {
    this.selected = [{ text: 'Male', id: '5fe2555b-f201-4165-8845-115039221463' }];
  }

  selectFeMale() {
    this.selected = [{ text: 'FeMale', id: 'ca22406c-350a-49e5-b0db-2714b164c560' }];
  }

  save(form) {
    console.log(form.value)
  }

  formatRepo(repo) {
    if (repo.loading) return repo.text;

    var markup = "<div class='select2-result-repository clearfix'>" +
      "<div class='select2-result-repository__avatar'><img src='" + repo.owner.avatar_url + "' style='width: 20px; height: 20px;' /></div>" +
      "<div class='select2-result-repository__meta'>" +
      "<div class='select2-result-repository__title'>" + repo.full_name + "</div>";

    if (repo.description) {
      markup += "<div class='select2-result-repository__description'>" + repo.description + "</div>";
    }

    markup += "<div class='select2-result-repository__statistics'>" +
      "<div class='select2-result-repository__forks'><i class='fa fa-flash'></i> " + repo.forks_count + " Forks</div>" +
      "<div class='select2-result-repository__stargazers'><i class='fa fa-star'></i> " + repo.stargazers_count + " Stars</div>" +
      "<div class='select2-result-repository__watchers'><i class='fa fa-eye'></i> " + repo.watchers_count + " Watchers</div>" +
      "</div>" +
      "</div></div>";

    return markup;
  }

  formatRepoSelection(repo) {
    return repo.full_name || repo.text;
  }
}
