/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function FreeSolo() {
  return (
    <div style={{marginLeft: 20, width: 300}}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={sampleTerms.map(term => term.term)}
        renderInput={params => (
          <TextField
            {...params}
            label="Search or create"
            margin="normal"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </div>
  );
}

// todo: Sort terms.
const sampleTerms = [
  {term: "一见钟情", pinyin: "yì jiàn zhōng qíng"},
  {term: "一无所知", pinyin: "yì wú suǒ zhī"},
  {term: "脚踏实地", pinyin: "jiǎo dà sí dì"},
  {term: "奶酪", pinyin: "nǎi lào"},
  {term: "踊跃", pinyin: "yǒng yuè"}
];
